import { Express } from 'express';
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { createUserAction } from './createUserAction';
import { getUserActions } from './getUserActions';
import { deleteUserAction } from './deleteUserAction';
import { updateUserAction } from './updateUserAction';

export function createUserActionsEndpoints(app: Express) {
    app.use(ClerkExpressRequireAuth());
    
    app.get('/actions/user', getUserActions);
    app.post('/actions/user', createUserAction);
    app.delete('/actions/user/:id', deleteUserAction);
    app.patch('/actions/user/:id', updateUserAction);
}
