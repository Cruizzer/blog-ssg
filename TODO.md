- Remove all the default false options for prayers to only store the true values
- Have an additional array (or something else) to mark whether each prayer is completed, so if a user decides to
- Have some form of persistence so that user previous prayers can be aggregated for future features
  Possibly add object to user's attributes for {totalComplines: ... , ...} upon submitting, change both user attribute and prayers record.
- Add completed boolean to prayers to figure out whether user can add another prayer schedule (in addition to dateEnded) 



# Prayers should do one of two things:
# Check whether there is an active prayer selection within the current time frame by running a database query
# If there is, then conditionally render that instead.

# Looks at the today's day and checks whether it is within the selection date, if it is, then render today's prayers for the true bools


# Constraints on prayer date
1. Allow people to enter multiple dates forward in the future
2. Dates cannot overlap
3. Have a completed property
4. 