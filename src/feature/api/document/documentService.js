import djangoRequest from '../../django-request/djangoRequest'
import {
  parserResultDocument,
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

  console.log(':t', rowCreator.creator)

  const result = {
    id: rowDocument.document_id,
    name: rowDocument.name,
    version: rowDocument.version,
    path: rowDocument.path,
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

  console.log(result)

  return result
}

export const getDocumentsService = async () => {
  const rows = await selectDocuments()
  const result = parserResultDocument(rows)
  return result
}

export const insertDocumentService = async (document, { user }) => {
  const objectBody = {
    document,
    user,
  }
  const apiInsertDocument = 'add-document/'
  const result = await djangoRequest.post(apiInsertDocument, objectBody, true)
  if (result.res) {
    const { status, message, prevBody } = {
      status: result.output.status,
      message: result.output.message,
      prevBody: result.output.prev_body.document,
    }
    prevBody.addVersion = prevBody.add_version
    return { status, message, prevBody }
  }
  return false
}

export default {}
