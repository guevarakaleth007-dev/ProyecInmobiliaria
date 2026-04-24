package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Departamento;
import parcialfinal.example.gestiApar.repository.DepartamentoRepository;

import java.util.List;

@Service
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository repo;

    public List<Departamento> listar() {
        return repo.findAll();
    }

    public List<Departamento> listarPorPais(Long idPais) {
        return repo.findByIdPais(idPais);
    }

    public Departamento guardar(Departamento d) {
        return repo.save(d);
    }

    public Departamento obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
