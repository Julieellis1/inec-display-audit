# INEC Display Audit

Citizen audit of polling unit structure on INEC's display portal, compared with the June 2021 list. Abia State first.

- Site: built from `Abia-Display-Audit-2026-11-06-v41.xlsx` by `build_website.py` in the audit folder.
- `index.html`: national home, introduction, aim, objectives, state selector.
- `abia.html`: Abia state page, key figures, findings, LGA table, search over all 4,062 polling units.
- `lga/`: one page per LGA with the full unit list, error checks and downloads.
- `method.html`: method, baseline, corrections and limitations.
- `data/`: the display and 2021 CSV files per LGA, plus the full workbook.
- `assets/`: stylesheet, search script and the search data file.

Headline result for Abia: display 4,062 = June 2021 4,062, change 0, in every LGA and every ward. Names still carry real problems; each LGA page lists them with codes.
