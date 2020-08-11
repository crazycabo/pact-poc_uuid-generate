import { Router, Request, Response } from 'express'
import { UUIDItem } from '../models/UUIDItem'
import { UUIDBatch } from '../models/UUIDBatch'
import { createLogger } from '../../../../utils/logger'
import { uuid, isUuid } from 'uuidv4'

const logger = createLogger('uuid')
const router: Router = Router()

// Get a random UUID using the version 4 RFC4122 spec
router.get('/', async (req: Request, res: Response) => {
  const newUuid = uuid()

  logger.info(`Create UUID: ${newUuid}`)

  res.send(new UUIDItem(newUuid))
})

// Get multiple UUIDs as a batch request
router.get('/batch/:count', async (req: Request, res: Response) => {
  const { count } = req.params

  const batch = new UUIDBatch()
  for (var i = 1; i <= parseInt(count); i++) {
    batch.addItem(uuid())
  }

  logger.info(`Create batch of ${count} UUIDs`)

  if (parseInt(count) === 0 || parseInt(count) > 20) {
    res.send({
      message: 'Error: Batch request count min is 1 and max is 20',
      count: parseInt(count)
    })
  } else {
    res.send(batch)
  }
})

// Validate a UUID
router.get('/validate/:uuidStr', async (req: Request, res: Response) => {
  const { uuidStr } = req.params
  const validated = isUuid(uuidStr)

  const validation = {
    "uuid": uuidStr,
    "isValid": validated
  }

  logger.info(`Validate UUID '${uuidStr}': ${validated}`)

  res.send(validation)
})

export const UUIDRouter: Router = router
