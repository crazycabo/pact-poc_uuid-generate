import { Verifier } from '@pact-foundation/pact'
import { IndexRouter } from '../src/controllers/v0/index.router'
import express from 'express'
import bodyParser from 'body-parser'

const port = 8220

const app = express()
app.use(bodyParser.json())
app.use('/api/v0/', IndexRouter)

app.listen(port, () => {
  console.log(`UUID generation service listening on http://localhost:${port}`)
})

describe("UUID producer", () => {
    const opts = {
        provider: "UUIDGenerate",
        providerVersion: process.env.CODEBUILD_RESOLVED_SOURCE_VERSION,
        pactBrokerUrl: process.env.PACT_BROKER_URL,
        pactBrokerToken: process.env.PACT_WRITE_TOKEN,
        publishVerificationResult: true,
        providerBaseUrl: `http://localhost:${port}`
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log("Pact verification complete")
      console.log(output)

      process.exit(0)
    }).catch((error) => {
      console.log('Error found during Pact verification', error)

      process.exit(1)
    })
})
