import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';
import Register from '../pages/Register';
import Alunos from '../pages/Alunos';
import Aluno from '../pages/Aluno';
import Fotos from '../pages/Fotos';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Alunos} isClosed={false} />
      <MyRoute exact path="/aluno/" component={Aluno} isClosed />
      <MyRoute path="/register/" component={Register} isClosed={false} />
      <MyRoute path="/login/" component={Login} isClosed={false} />
      <MyRoute path="/aluno/:id/edit" component={Aluno} isClosed />
      <MyRoute path="/fotos/:id" component={Fotos} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
