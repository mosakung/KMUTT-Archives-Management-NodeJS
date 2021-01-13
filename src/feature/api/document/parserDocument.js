const parserDocument = {
  document: (param, { user }) => {
    if (!(param.name && param.path && param.DC_title)) { return false }

    const document = {
      add_version: param.addVersion,
      page_start: param.startPage,
      name: param.name,
      path: param.path,
      DC_relation: param.DC_relation ? [...param.DC_relation] : null,
      DC_type: param.DC_type ? [...param.DC_type] : null,
      DC_title: param.DC_title,
      DC_title_alternative: param.DC_title_alternative !== '' ? param.DC_title_alternative : null,
      DC_description_table_of_contents: param.DC_description_table_of_contents !== '' ? param.DC_description_table_of_contents : null,
      DC_description_summary: param.DC_description_summary !== '' ? param.DC_description_summary : null,
      DC_description_abstract: param.DC_description_abstract !== '' ? param.DC_description_abstract : null,
      DC_description_note: param.DC_description_note !== '' ? param.DC_description_note : null,
      DC_format: param.DC_format !== '' ? param.DC_format : null,
      DC_format_extent: param.DC_format_extent !== '' ? param.DC_format_extent : null,
      DC_identifier_URL: param.DC_identifier_URL !== '' ? param.DC_identifier_URL : null,
      DC_identifier_ISBN: param.DC_identifier_ISBN !== '' ? param.DC_identifier_ISBN : null,
      DC_source: param.DC_source !== '' ? param.DC_source : null,
      DC_language: param.DC_language !== '' ? param.DC_language : null,
      DC_coverage_spatial: param.DC_coverage_spatial !== '' ? param.DC_coverage_spatial : null,
      DC_coverage_temporal_year: param.DC_coverage_temporal_year !== '' ? param.DC_coverage_temporal_year : null,
      DC_coverage_temporal: param.DC_coverage_temporal !== '' ? param.DC_coverage_temporal : null,
      DC_rights: param.DC_rights !== '' ? param.DC_rights : null,
      DC_rights_access: param.DC_rights_access !== '' ? param.DC_rights_access : null,
      thesis_degree_name: param.thesis_degree_name !== '' ? param.thesis_degree_name : null,
      thesis_degree_level: param.thesis_degree_level !== '' ? param.thesis_degree_level : null,
      thesis_degree_discipline: param.thesis_degree_discipline !== '' ? param.thesis_degree_discipline : null,
      thesis_degree_grantor: param.thesis_degree_grantor !== '' ? param.thesis_degree_grantor : null,
      DC_creator: param.DC_creator !== '' ? param.DC_creator : null,
      DC_creator_orgname: param.DC_creator_orgname !== '' ? param.DC_creator_orgname : null,
      DC_publisher: param.DC_publisher !== '' ? param.DC_publisher : null,
      DC_publisher_email: param.DC_publisher_email !== '' ? param.DC_publisher_email : null,
      DC_contributor: param.DC_contributor !== '' ? param.DC_contributor : null,
      DC_contributor_role: param.DC_contributor_role !== '' ? param.DC_contributor_role : null,
      DC_issued_date: param.DC_issued_date !== '' ? param.DC_issued_date : null,
      rec_create_by: user.id,
      rec_modified_by: user.id,
    }

    return document
  },
  resultDcKeyword: (param) => param.map((value) => (
    value.DC_keyword
  )),
  resultDcRelation: (param) => param.map((value) => (
    value.DC_relation
  )),
  resultDcType: (param) => param.map((value) => (
    value.DC_type
  )),
}

export default parserDocument
