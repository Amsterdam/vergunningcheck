export function searchForBeperking(query) {
  const uri =
    query &&
    `${SHARED_CONFIG.API_ROOT}brk/object/?verblijfsobjecten__id=${query}`;
  if (uri) {
    return (
      getByUri(uri)
        // get id (kadastrale_objecten__id)
        .then((response) =>
          response.results.length > 0 ? response.results[0].id : false
        )
        // get beperking
        // https://api.data.amsterdam.nl/wkpb/beperking/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11440755470000
        .then((id) =>
          id
            ? getByUri(
                `${SHARED_CONFIG.API_ROOT}wkpb/beperking/?kadastrale_objecten__id=${id}`
              )
            : false
        )
        .then((response) =>
          response.results.length > 0 ? response.results : []
        )
    );
  }
  return "";
}
