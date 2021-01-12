import { Router } from 'express';
import { UserController } from '../controllers';
//

const router = Router();
const { 
  deleteOne, 
  readAll, 
  fetchOne, 
  register,
   updateuser,
 } = new UserController();


router
  .route('/teachers')
  .post(register)
  .get(readAll)

router
  .route('/teachers/:_id')
  .get(fetchOne)
  .delete(deleteOne)
  .patch(updateuser)

 export default router;