export const parserDocument = (param, { user }) => {
  if (!(param.name && param.path && param.DC_title)) { return false }

  const document = {
    add_version: param.addVersion,
    name: param.name,
    path: param.path,
    DC_relation: param.DC_relation ? [...param.DC_relation] : null,
    DC_type: param.DC_type ? [...param.DC_type] : null,
    DC_title: param.DC_title,
    DC_title_alternative: param.DC_title_alternative,
    DC_description_table_of_contents: param.DC_description_table_of_contents,
    DC_description_summary_or_abstract: param.DC_description_summary_or_abstract,
    DC_description_note: param.DC_description_note,
    DC_format: param.DC_format,
    DC_format_extent: param.DC_format_extent,
    DC_identifier_URL: param.DC_identifier_URL,
    DC_identifier_ISBN: param.DC_identifier_ISBN,
    DC_source: param.DC_source,
    DC_language: param.DC_language,
    DC_coverage_spatial: param.DC_coverage_spatial,
    DC_coverage_temporal: param.DC_coverage_temporal,
    DC_rights: param.DC_rights,
    DC_rights_access: param.DC_rights_access,
    thesis_degree_name: param.thesis_degree_name,
    thesis_degree_level: param.thesis_degree_level,
    thesis_degree_discipline: param.thesis_degree_discipline,
    thesis_degree_grantor: param.thesis_degree_grantor,
    DC_creator: param.DC_creator,
    DC_creator_orgname: param.DC_creator_orgname,
    DC_publisher: param.DC_publisher,
    DC_publisher_email: param.DC_publisher_email,
    DC_contributor: param.DC_contributor,
    DC_contributor_role: param.DC_contributor_role,
    DC_issued_date: param.DC_issued_date,
    rec_create_by: user.id,
    rec_modified_by: user.id,
  }

  return document
}

export const parserResultDcKeyword = (param) => param.map((value) => (
  value.DC_keyword
))

export const parserResultDcRelation = (param) => param.map((value) => (
  value.DC_relation
))

export const parserResultDcType = (param) => param.map((value) => (
  value.DC_type
))

export default {}
