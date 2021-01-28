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
  rename: (name) => {
    const nameList = {
      statusProcessDocument: 'status_process_document',
      name: 'name',
      version: 'version',
      path: 'path',
      dcTitle: 'DC_title',
      dcTitleAlternative: 'DC_title_alternative',
      dcDescriptionTableOfContents: 'DC_description_table_of_contents',
      dcDescriptionNote: 'DC_description_note',
      dcDescriptionSummary: 'DC_description_summary',
      dcDescriptionAbstract: 'DC_description_abstract',
      dcFormat: 'DC_format',
      dcFormatExtent: 'DC_format_extent',
      dcIdentifierURL: 'DC_identifier_URL',
      dcIdentifierISBN: 'DC_identifier_ISBN',
      dcSource: 'DC_source',
      dcLanguage: 'DC_language',
      dcCoverageSpatial: 'DC_coverage_spatial',
      dcCoverageTemporal: 'DC_coverage_temporal',
      dcCoverageTemporalYear: 'DC_coverage_temporal_year',
      dcRights: 'DC_rights',
      dcRightsAccess: 'DC_rights_access',
      thesisDegreeName: 'thesis_degree_name',
      thesisDegreeLevel: 'thesis_degree_level',
      thesisDegreeDiscipline: 'thesis_degree_discipline',
      thesisDegreeGrantor: 'thesis_degree_grantor',
    }

    return nameList[name]
  },
  bodyInsertType: (types, documentId) => types.map((type) => ({ DC_type: type, index_document_id: documentId })),
  bodyInsertRelation: (relations, documentId) => relations.map((relation) => ({ DC_relation: relation, index_document_id: documentId })),
  mergeUpdateIndexDetailDocument: (newIndex, prevDocument) => {
    const rename = {
      corpus: {
        creator: ['creator', 'index_creator'],
        creatorOrgname: ['creator_orgname', 'index_creator_orgname'],
        publisher: ['publisher', 'index_publisher'],
        publisherEmail: ['publisher_email', 'index_publisher_email'],
        contributor: ['contributor', 'index_contributor'],
        contributorRole: ['contributor_role', 'index_contributor'],
        issuedDate: ['issued_date', 'index_issued_date'],
      },
      start(name) {
        return this.corpus[name] ? this.corpus[name] : null
      },
    }
    return Object.keys(rename.corpus).map((el) => {
      const keyDBs = rename.start(el)
      if (keyDBs[1] in prevDocument) {
        return { indexname: keyDBs[0], indexTerm: prevDocument[keyDBs[1]], newValue: newIndex[el] ? newIndex[el] : null }
      }
      return { }
    })
  },
  updateDocument: (param, userId, datetime) => ({
    DC_title_alternative: param.DC_title_alternative !== undefined ? param.DC_title_alternative : null,
    DC_description_table_of_contents: param.DC_description_table_of_contents !== undefined ? param.DC_description_table_of_contents : null,
    DC_description_summary: param.DC_description_summary !== undefined ? param.DC_description_summary : null,
    DC_description_abstract: param.DC_description_abstract !== undefined ? param.DC_description_abstract : null,
    DC_description_note: param.DC_description_note !== undefined ? param.DC_description_note : null,
    DC_format: param.DC_format !== undefined ? param.DC_format : null,
    DC_format_extent: param.DC_format_extent !== undefined ? param.DC_format_extent : null,
    DC_identifier_URL: param.DC_identifier_URL !== undefined ? param.DC_identifier_URL : null,
    DC_identifier_ISBN: param.DC_identifier_ISBN !== undefined ? param.DC_identifier_ISBN : null,
    DC_source: param.DC_source !== undefined ? param.DC_source : null,
    DC_language: param.DC_language !== undefined ? param.DC_language : null,
    DC_coverage_spatial: param.DC_coverage_spatial !== undefined ? param.DC_coverage_spatial : null,
    DC_coverage_temporal_year: param.DC_coverage_temporal_year !== undefined ? param.DC_coverage_temporal_year : null,
    DC_coverage_temporal: param.DC_coverage_temporal !== undefined ? param.DC_coverage_temporal : null,
    DC_rights: param.DC_rights !== undefined ? param.DC_rights : null,
    DC_rights_access: param.DC_rights_access !== undefined ? param.DC_rights_access : null,
    thesis_degree_name: param.thesis_degree_name !== undefined ? param.thesis_degree_name : null,
    thesis_degree_level: param.thesis_degree_level !== undefined ? param.thesis_degree_level : null,
    thesis_degree_discipline: param.thesis_degree_discipline !== undefined ? param.thesis_degree_discipline : null,
    thesis_degree_grantor: param.thesis_degree_grantor !== undefined ? param.thesis_degree_grantor : null,
    rec_modified_at: datetime,
    rec_modified_by: userId,
  }),
}

export default parserDocument
