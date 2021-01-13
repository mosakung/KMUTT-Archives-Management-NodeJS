import { createWriteStream, unlinkSync, readFileSync } from 'fs'

import djangoRequest from '../../django-request/djangoRequest'
import parser from './parserDocument'

import repo from './documentRepository'

export const getDocumentService = async (pk) => {
  const rowDocument = await repo.selectDocument(pk)
  if (typeof (rowDocument) === 'undefined') {
    return { statusQuery: false }
  }
  const rowsKeyword = await repo.selectDcKeyword(pk)
  const rowsRelation = await repo.selectDcRelation(pk)
  const rowsType = await repo.selectDcType(pk)
  const rowCreator = await repo.selectIndexingCreatorDocument(rowDocument.index_creator)
  const rowCreatorOrgname = await repo.selectIndexingCreatorOrgnameDocument(rowDocument.index_creator_orgname)
  const rowPublisher = await repo.selectIndexingPublisherDocument(rowDocument.index_publisher)
  const rowContributor = await repo.selectIndexingContributorDocument(rowDocument.index_contributor)
  const rowIssuedDate = await repo.selectIndexingIssuedDateDocument(rowDocument.index_issued_date)
  const top10Tag = await repo.selectTopNTag(pk, 10)
  const resultImage = readFileSync(`${rowDocument.path_image}/page${rowDocument.page_start}.jpg`, { encoding: 'base64' }, (error, data) => {
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
    publisherEmail: rowPublisher.publisher_email,
    contributor: rowContributor.contributor,
    contributorRole: rowContributor.contributor_role,
    issuedDate: rowIssuedDate.issued_date,
    status: rowDocument.status_process_document,
    tag: top10Tag,
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

export default {}
