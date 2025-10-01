import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno) => (
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

            <Link to={`/aluno/${aluno.id}`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}

export default Alunos;
