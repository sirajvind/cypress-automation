import fs from 'fs'
import path from 'path'
import jsonfile from 'jsonfile'

const reportsDir = path.join(process.cwd(), 'cypress', 'reports')
const outputFile = path.join(reportsDir, 'index.json')

// Read all JSON reports
const reportFiles = fs
  .readdirSync(reportsDir)
  .filter(file => file.endsWith('.json') && file !== 'output.json')
  .map(file => path.join(reportsDir, file))

// Merge reports
const mergedResults = {
  stats: {
    suites: 0,
    tests: 0,
    passes: 0,
    pending: 0,
    failures: 0,
    start: new Date().toISOString(),
    end: new Date().toISOString(),
    duration: 0,
    testsRegistered: 0,
    passPercent: 0,
    pendingPercent: 0,
    other: 0,
    hasOther: false,
    skipped: 0,
    hasSkipped: false,
  },
  results: [],
}

reportFiles.forEach(file => {
  const report = jsonfile.readFileSync(file)
  mergedResults.results.push(...report.results)

  // Update stats
  if (report.stats) {
    mergedResults.stats.suites += report.stats.suites || 0
    mergedResults.stats.tests += report.stats.tests || 0
    mergedResults.stats.passes += report.stats.passes || 0
    mergedResults.stats.pending += report.stats.pending || 0
    mergedResults.stats.failures += report.stats.failures || 0
    mergedResults.stats.duration += report.stats.duration || 0
    mergedResults.stats.testsRegistered += report.stats.testsRegistered || 0
    mergedResults.stats.other += report.stats.other || 0
    mergedResults.stats.skipped += report.stats.skipped || 0
  }
})

// Calculate percentages
mergedResults.stats.passPercent =
  mergedResults.stats.tests > 0 ? (mergedResults.stats.passes / mergedResults.stats.tests) * 100 : 0
mergedResults.stats.pendingPercent =
  mergedResults.stats.tests > 0
    ? (mergedResults.stats.pending / mergedResults.stats.tests) * 100
    : 0

// Write merged results to output.json
jsonfile.writeFileSync(outputFile, mergedResults, { spaces: 2 })
console.log('Reports merged successfully!')
