- Remove all the default false options for prayers to only store the true values
- Have an additional array (or something else) to mark whether each prayer is completed, so if a user decides to
- Have some form of persistence so that user previous prayers can be aggregated for future features
  Possibly add object to user's attributes for {totalComplines: ... , ...} upon submitting, change both user attribute and prayers record.
- Add completed boolean to prayers to figure out whether user can add another prayer schedule (in addition to dateEnded) 