import { Router } from "express";

import {index,show,showAbsent} from "../../controllers/attedance.js";


const router = new Router();

router.get('/', index);
router.get('/:_id',show);
router.get('/:id/AttedanceOfSubject', showAbsent);

export default router;

