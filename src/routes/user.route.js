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
  .route('/users')
  .post(register)
  .get(readAll)

router
  .route('/users/:_id')
  .get(fetchOne)
  .delete(deleteOne)
  .patch(updateuser)

 export default router;