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
    DC_title: rowDocument.DC_title,
    DC_title_alternative: rowDocument.DC_title_alternative,
    DC_description_table_of_contents: rowDocument.DC_description_table_of_contents,
    DC_description_summary_or_abstract: rowDocument.DC_description_summary_or_abstract,
    DC_description_note: rowDocument.DC_description_note,
    DC_format: rowDocument.DC_format,
    DC_format_extent: rowDocument.DC_format_extent,
    DC_identifier_URL: rowDocument.DC_identifier_URL,
    DC_identifier_ISBN: rowDocument.DC_identifier_ISBN,
    DC_source: rowDocument.DC_source,
    DC_language: rowDocument.DC_language,
    DC_coverage_spatial: rowDocument.DC_coverage_spatial,
    DC_coverage_temporal: rowDocument.DC_coverage_temporal,
    DC_coverage_temporal_year: rowDocument.DC_coverage_temporal_year,
    DC_rights: rowDocument.DC_rights,
    DC_rights_access: rowDocument.DC_rights_access,
    thesis_degree_name: rowDocument.thesis_degree_name,
    thesis_degree_level: rowDocument.thesis_degree_level,
    thesis_degree_discipline: rowDocument.thesis_degree_discipline,
    thesis_degree_grantor: rowDocument.thesis_degree_grantor,
    rec_create_at: rowDocument.rec_create_at,
    rec_create_by: rowDocument.rec_create_by,
    rec_modified_at: rowDocument.rec_modified_at,
    rec_modified_by: rowDocument.rec_modified_by,
    DC_keyword: parserResultDcKeyword(rowsKeyword),
    DC_relation: parserResultDcRelation(rowsRelation),
    DC_type: parserResultDcType(rowsType),
    creator: rowCreator.creator,
    creator_orgname: rowCreatorOrgname.creator_orgname,
    publisher: rowPublisher.publisher,
    publisherEmail: rowPublisher.publisher_email,
    contributor: rowContributor.contributor,
    contributorEmail: rowContributor.contributor_role,
    issued_date: rowIssuedDate.issued_date,
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
      DC_title: value.DC_title,
      DC_title_alternative: value.DC_title_alternative,
      DC_description_table_of_contents: value.DC_description_table_of_contents,
      DC_description_summary_or_abstract: value.DC_description_summary_or_abstract,
      DC_description_note: value.DC_description_note,
      DC_format: value.DC_format,
      DC_format_extent: value.DC_format_extent,
      DC_identifier_URL: value.DC_identifier_URL,
      DC_identifier_ISBN: value.DC_identifier_ISBN,
      DC_source: value.DC_source,
      DC_language: value.DC_language,
      DC_coverage_spatial: value.DC_coverage_spatial,
      DC_coverage_temporal: value.DC_coverage_temporal,
      DC_coverage_temporal_year: value.DC_coverage_temporal_year,
      DC_rights: value.DC_rights,
      DC_rights_access: value.DC_rights_access,
      thesis_degree_name: value.thesis_degree_name,
      thesis_degree_level: value.thesis_degree_level,
      thesis_degree_discipline: value.thesis_degree_discipline,
      thesis_degree_grantor: value.thesis_degree_grantor,
      rec_create_at: value.rec_create_at,
      rec_create_by: value.rec_create_by,
      rec_modified_at: value.rec_modified_at,
      rec_modified_by: value.rec_modified_by,
      DC_keyword: parserResultDcKeyword(rowsKeyword),
      DC_relation: parserResultDcRelation(rowsRelation),
      DC_type: parserResultDcType(rowsType),
      creator: rowCreator.creator,
      creator_orgname: rowCreatorOrgname.creator_orgname,
      publisher: rowPublisher.publisher,
      publisherEmail: rowPublisher.publisher_email,
      contributor: rowContributor.contributor,
      contributorEmail: rowContributor.contributor_role,
      issued_date: rowIssuedDate.issued_date,
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
