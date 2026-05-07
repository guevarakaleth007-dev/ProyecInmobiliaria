package parcialfinal.example.gestiApar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parcialfinal.example.gestiApar.model.Apartamento;
import parcialfinal.example.gestiApar.repository.ApartamentoRepository;

@Service
public class ApartamentoService {

    @Autowired
    private ApartamentoRepository repo;

    public List<Apartamento> listar() {
        return repo.findAll();
    }

    public List<Apartamento> listarPorEstado(Boolean estado) {
        return repo.findByEstado(estado);
    }

    public Apartamento guardar(Apartamento a) {
        return repo.save(a);
    }

    public Apartamento obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
