package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Pais;
import parcialfinal.example.gestiApar.repository.PaisRepository;

import java.util.List;

@Service
public class PaisService {

    @Autowired
    private PaisRepository repo;

    public List<Pais> listar() {
        return repo.findAll();
    }

    public Pais guardar(Pais p) {
        return repo.save(p);
    }

    public Pais obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
