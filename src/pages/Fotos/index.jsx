import React, { useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form, Title } from './styled';
import api from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        toast.error('Erro ao obter imagem');
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);
      await api.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };
  return (
    <Container>
      <Title>Fotos</Title>

      <Loading isLoading={isLoading} />

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img src={foto} alt="Foto do aluno" crossOrigin="anonymous" />
          ) : (
            'Selecionar'
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

export default Fotos;

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
