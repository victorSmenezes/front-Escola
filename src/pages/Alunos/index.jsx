import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
  FaEdit,
  FaExclamation,
  FaUserCircle,
  FaWindowClose,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import api from '../../services/axios';
import { AlunoContainer, ProfilePicture } from './styled';
import Loading from '../../components/Loading';

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await api.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();

    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');

    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login novamente.');
      } else {
        toast.error('Ocorreu um erro ao deletar o aluno.');
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={aluno.id}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img
                  src={get(aluno, 'Fotos[0].url', '')}
                  crossOrigin="anonymous"
                  alt=""
                />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}

export default Alunos;
