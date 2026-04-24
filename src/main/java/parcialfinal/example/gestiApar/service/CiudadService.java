package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Ciudad;
import parcialfinal.example.gestiApar.repository.CiudadRepository;

import java.util.List;

@Service
public class CiudadService {

    @Autowired
    private CiudadRepository repo;

    public List<Ciudad> listar() {
        return repo.findAll();
    }

    public List<Ciudad> listarPorDepartamento(Long idDepartamento) {
        return repo.findByIdDepartamento(idDepartamento);
    }

    public Ciudad guardar(Ciudad c) {
        return repo.save(c);
    }

    public Ciudad obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
