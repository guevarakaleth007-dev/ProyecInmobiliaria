package parcialfinal.example.gestiApar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parcialfinal.example.gestiApar.model.Persona;
import parcialfinal.example.gestiApar.repository.PersonaRepository;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository repo;

    public List<Persona> listar() {
        return repo.findAllOrdenado();
    }

    public Persona guardar(Persona p) {
        return repo.save(p);
    }

    public Persona obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
