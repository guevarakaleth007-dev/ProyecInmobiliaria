package parcialfinal.example.gestiApar.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Propietario;
import parcialfinal.example.gestiApar.repository.PropietarioRepository;

@Service
public class PropietarioService {
    @Autowired
    private PropietarioRepository repo;

    public List<Propietario> listar()           { return repo.findAllOrdenado(); }
    public Propietario guardar(Propietario p)    { return repo.save(p); }
    public Propietario obtener(Long id)          { return repo.findById(id).orElse(null); }
    public void eliminar(Long id)                { repo.deleteById(id); }
}
