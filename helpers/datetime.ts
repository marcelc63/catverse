import { DateTime } from 'luxon'

export const ageFormat = function (patientDOB: string): number {
  return Math.floor(
    Math.abs(DateTime.fromISO(patientDOB).diffNow('years').years)
  )
}

export const diffFormat = function (startsAt: string): number {
  return Math.max(
    Math.floor(-1 * DateTime.fromISO(startsAt).diffNow('days').days),
    0
  )
}
