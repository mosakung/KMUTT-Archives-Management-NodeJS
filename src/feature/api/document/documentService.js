import { createWriteStream, unlinkSync, rename } from 'fs'

import djangoRequest from '../../django-request/djangoRequest'
import {
  parserResultDcKeyword,
  parserResultDcRelation,
  parserResultDcType,
} from './parserDocument'

import {
  selectDocument,
  selectDocuments,
  selectDcKeyword,
  selectDcRelation,
  selectDcType,
  selectIndexingContributorDocument,
  selectIndexingCreatorDocument,
  selectIndexingCreatorOrgnameDocument,
  selectIndexingIssuedDateDocument,
  selectIndexingPublisherDocument,
} from './documentRepository'

export const getDocumentService = async (pk) => {
  const rowDocument = await selectDocument(pk)
  const rowsKeyword = await selectDcKeyword(pk)
  const rowsRelation = await selectDcRelation(pk)
  const rowsType = await selectDcType(pk)
  const rowCreator = await selectIndexingCreatorDocument(rowDocument.index_creator)
  const rowCreatorOrgname = await selectIndexingCreatorOrgnameDocument(rowDocument.index_creator_orgname)
  const rowPublisher = await selectIndexingPublisherDocument(rowDocument.index_publisher)
  const rowContributor = await selectIndexingContributorDocument(rowDocument.index_contributor)
  const rowIssuedDate = await selectIndexingIssuedDateDocument(rowDocument.index_issued_date)

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
    abstract: rowDocument.DC_description_summary_or_abstract,
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
    recCreateAt: rowDocument.reCreateAt,
    recCreateBy: rowDocument.Cc_creBe_by,
    recModifiedAt: rowDocument.rec_mAified_at,
    recModifiedBy: rowDocument.recBodified_by,
    keyword: parserResultDcKeyword(rowsKeyword),
    relation: parserResultDcRelation(rowsRelation),
    type: parserResultDcType(rowsType),
    creator: rowCreator.creator,
    creatorOrgName: rowCreatorOrgname.creator_orgname,
    publisher: rowPublisher.publisher,
    publisherEmail: rowPublisher.publisher_email,
    contributor: rowContributor.contributor,
    contributorEmail: rowContributor.contributor_role,
    issuedDate: rowIssuedDate.issued_date,
  }

  return result
}

export const getDocumentsService = async () => {
  const rows = await selectDocuments()

  const rowsWithDetail = rows.map(async (value) => {
    const pk = value.document_id
    const rowsKeyword = await selectDcKeyword(pk)
    const rowsRelation = await selectDcRelation(pk)
    const rowsType = await selectDcType(pk)
    const rowCreator = await selectIndexingCreatorDocument(value.index_creator)
    const rowCreatorOrgname = await selectIndexingCreatorOrgnameDocument(value.index_creator_orgname)
    const rowPublisher = await selectIndexingPublisherDocument(value.index_publisher)
    const rowContributor = await selectIndexingContributorDocument(value.index_contributor)
    const rowIssuedDate = await selectIndexingIssuedDateDocument(value.index_issued_date)

    return {
      id: value.document_id,
      name: value.name,
      version: value.version,
      pageStart: value.page_start,
      amountPage: value.amount_page,
      path: value.path,
      pathImage: value.path_image,
      title: value.DC_title,
      titleAlternative: value.DC_title_alternative,
      tableOfContents: value.DC_description_table_of_contents,
      abstract: value.DC_description_summary_or_abstract,
      note: value.DC_description_note,
      format: value.DC_format,
      formatExtent: value.DC_format_extent,
      identifierURL: value.DC_identifier_URL,
      identifierISBN: value.DC_identifier_ISBN,
      source: value.DC_source,
      language: value.DC_language,
      coverageSpatial: value.DC_coverage_spatial,
      coverageTemporal: value.DC_coverage_temporal,
      coverageTemporalYear: value.DC_coverage_temporal_year,
      rights: value.DC_rights,
      rightsAccess: value.DC_rights_access,
      thesisDegreeName: value.thesis_degree_name,
      thesisDegreeLevel: value.thesis_degree_level,
      thesisDegreeDiscipline: value.thesis_degree_discipline,
      thesisDegreeGrantor: value.thesis_degree_grantor,
      recCreateAt: value.rec_create_at,
      recCreateBy: value.rec_create_by,
      recModifiedAt: value.rec_modified_at,
      recModifiedBy: value.rec_modified_by,
      keyword: parserResultDcKeyword(rowsKeyword),
      relation: parserResultDcRelation(rowsRelation),
      type: parserResultDcType(rowsType),
      creator: rowCreator.creator,
      creatorOrgName: rowCreatorOrgname.creator_orgname,
      publisher: rowPublisher.publisher,
      publisherEmail: rowPublisher.publisher_email,
      contributor: rowContributor.contributor,
      contributorEmail: rowContributor.contributor_role,
      issuedDate: rowIssuedDate.issued_date,
    }
  })

  return rowsWithDetail
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

export default {}
