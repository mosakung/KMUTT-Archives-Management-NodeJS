import {
  createWriteStream, unlinkSync,
  promises as fsp,
} from 'fs'

import djangoRequest from '../../django-request/djangoRequest'
import parser from './parserDocument'

import repo from './documentRepository'

/* IMPORT SERVICE KEYWORD */
import { tagInDocumentService } from '../user-keyword/userKeywordService'

export const getDocumentService = async (pk) => {
  const rowDocument = await repo.selectDocument(pk)
  if (typeof (rowDocument) === 'undefined') {
    return { statusQuery: false }
  }
  const rowsKeyword = await repo.selectDcKeyword(pk)
  const contributorId = await repo.selectDcContributors(pk)
  const rowsRelation = await repo.selectDcRelation(pk)
  const rowsType = await repo.selectDcType(pk)
  const rowCreator = await repo.selectIndexingCreatorDocument(rowDocument.index_creator)
  const rowCreatorOrgname = await repo.selectIndexingCreatorOrgnameDocument(rowDocument.index_creator_orgname)
  const rowPublisher = await repo.selectIndexingPublisherDocument(rowDocument.index_publisher)
  const rowPublisherEmail = await repo.selectIndexingPublisherEmailDocument(rowDocument.index_publisher_email)

  const rowsContributor = await Promise.all(contributorId.map(async (indexContributor) => {
    const contributorName = await repo.selectIndexingContributorDocument(indexContributor)
    const contributorRoles = await repo.selectContributorRoleDocument(indexContributor)
    return { name: contributorName, roles: contributorRoles }
  }))

  const rowIssuedDate = await repo.selectIndexingIssuedDateDocument(rowDocument.index_issued_date)
  const date = rowIssuedDate.issued_date
  let publishs = null
  if (date) {
    publishs = `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getDate()}`
  }
  const tag = await tagInDocumentService(pk)

  const resultImage = await fsp.readFile(`${rowDocument.path_image}/page${rowDocument.page_start}.jpg`, { encoding: 'base64' }, (error, data) => {
    if (error) {
      return error
    }
    return data
  })

  const result = {
    id: rowDocument.document_id,
    name: rowDocument.name,
    version: rowDocument.version,
    pageStart: rowDocument.page_start,
    amountPage: rowDocument.amount_page,
    path: rowDocument.path,
    pathImage: rowDocument.path_image,
    title: rowDocument.DC_title,
    titleAlternative: rowDocument.DC_title_alternative,
    tableOfContents: rowDocument.DC_description_table_of_contents,
    summary: rowDocument.DC_description_summary,
    abstract: rowDocument.DC_description_abstract,
    note: rowDocument.DC_description_note,
    format: rowDocument.DC_format,
    formatExtent: rowDocument.DC_format_extent,
    identifierURL: rowDocument.DC_identifier_URL,
    identifierISBN: rowDocument.DC_identifier_ISBN,
    source: rowDocument.DC_source,
    language: rowDocument.DC_language,
    coverageSpatial: rowDocument.DC_coverage_spatial,
    coverageTemporal: rowDocument.DC_coverage_temporal,
    coverageTemporalYear: rowDocument.DC_coverage_temporal_year,
    rights: rowDocument.DC_rights,
    rightsAccess: rowDocument.DC_rights_access,
    thesisDegreeName: rowDocument.thesis_degree_name,
    thesisDegreeLevel: rowDocument.thesis_degree_level,
    thesisDegreeDiscipline: rowDocument.thesis_degree_discipline,
    thesisDegreeGrantor: rowDocument.thesis_degree_grantor,
    recCreateAt: rowDocument.rec_create_at,
    recCreateBy: rowDocument.rec_create_by,
    recModifiedAt: rowDocument.rec_modified_at,
    recModifiedBy: rowDocument.rec_modified_by,
    keyword: parser.resultDcKeyword(rowsKeyword),
    relation: parser.resultDcRelation(rowsRelation),
    type: parser.resultDcType(rowsType),
    creator: rowCreator.creator,
    creatorOrgName: rowCreatorOrgname.creator_orgname,
    publisher: rowPublisher.publisher,
    publisherEmail: rowPublisherEmail.publisher_email,
    contributor: rowsContributor,
    issuedDate: publishs,
    status: rowDocument.status_process_document,
    tag,
    image: resultImage,
  }

  return { document: result, statusQuery: true }
}

export const insertDocumentService = async (document, { user }) => {
  const objectBody = {
    document,
    user,
  }
  const apiInsertDocument = 'add-document/'
  const result = await djangoRequest.post(apiInsertDocument, objectBody, true)
  if (result.res) {
    const {
      status, message, documentId, prevBody,
    } = {
      status: result.output.status,
      message: result.output.message,
      documentId: result.output.documentId,
      prevBody: result.output.prev_body.document,
    }
    prevBody.addVersion = prevBody.add_version
    return {
      status, message, documentId, prevBody,
    }
  }
  return false
}

export const updateDocumentService = async (documentId, body, user) => {
  const funRename = parser.rename

  const typeSet = []
  const relationSet = []
  const contributorSet = []
  const contributorRoleSet = []
  const newIndexDic = {}
  const bodyDocumentUpdate = {}

  Object.keys(body).forEach((key) => {
    if (body[key] !== '' && body[key] !== null) {
      if (key === 'type') {
        typeSet.push(...body[key])
      } else if (key === 'relation') {
        relationSet.push(...body[key])
      } else if (key === 'contributor') {
        contributorSet.push(...body[key])
      } else if (key === 'contributorRole') {
        contributorRoleSet.push(...body[key])
      } else if (
        key === 'creator'
        || key === 'creatorOrgname'
        || key === 'publisher'
        || key === 'publisherEmail'
        // || key === 'contributor'
        // || key === 'contributorRole'
        || key === 'issuedDate'
      ) {
        newIndexDic[key] = body[key]
      } else {
        bodyDocumentUpdate[funRename(key)] = body[key]
      }
    }
  })

  /* Type Relations */
  const bodyOverrideTypes = parser.bodyInsertType(typeSet, documentId)
  const bodyOverrideRelations = parser.bodyInsertRelation(relationSet, documentId)

  await repo.overrideTypeDocument(bodyOverrideTypes, documentId)
  await repo.overrideRelationDocument(bodyOverrideRelations, documentId)

  /* Contributor */
  await Promise.all(contributorSet.map((contributor) => {
    
  }))

  /* Fine Index in Document */
  const documentInformation = await repo.selectDocument(documentId)

  const bodyUpdateIndex = parser.mergeUpdateIndexDetailDocument(newIndexDic, documentInformation)

  await repo.overrideCreatorDocument(bodyUpdateIndex, documentId)
  await repo.overrideCreatorOrgnameDocument(bodyUpdateIndex, documentId)
  await repo.overridePublisherDocument(bodyUpdateIndex, documentId)
  await repo.overridePublisherEmailDocument(bodyUpdateIndex, documentId)
  await repo.overrideIssuedDateDocument(bodyUpdateIndex, documentId)

  /* Update Modified */
  const bodyDocument2Update = parser.updateDocument(bodyDocumentUpdate, user.id, new Date())

  await repo.updateDocument(bodyDocument2Update, documentId)

  return { updatestatus: true, error: null, prevBody: body }
}

export const uploadDocumentService = async (fileUpload) => {
  const {
    createReadStream, mimetype, encoding,
  } = await fileUpload

  const stream = createReadStream()

  const uploadDir = `${process.cwd()}/uploadfile`
  const name = `${Date.now() + Math.random()}.pdf`
  const path = `${uploadDir}/${name}`

  await new Promise((resolve, reject) => stream
    .on('error', (error) => {
      if (stream.truncated) {
        // delete the truncated file
        unlinkSync(path)
      }
      reject(error)
    })
    .pipe(createWriteStream(path))
    .on('error', (error) => reject(error))
    .on('finish', () => resolve({ path })))

  const result = {
    filename: name, encoding, mimetype, pathFile: path,
  }

  return result
}

export const softDeleteDocumentService = async (documentId) => repo.deleteDocumentSoft(documentId)

export const pdfDocumentService = async (documentId) => {
  const { path } = await repo.selectDocument(documentId)
  try {
    const pdfFile = await fsp.readFile(path, { encoding: 'base64' }, (err, data) => {
      if (err) throw err
      return data
    })
    return { pdfBase64: `data:application/pdf;base64,${pdfFile}`, statusQuery: true }
  } catch (err) {
    console.log('error read file pdf', err)
  }
  return { statusQuery: false }
}

export default {}
