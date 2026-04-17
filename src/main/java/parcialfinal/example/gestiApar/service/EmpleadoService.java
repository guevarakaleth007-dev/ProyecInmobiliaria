package parcialfinal.example.gestiApar.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Empleado;
import parcialfinal.example.gestiApar.repository.EmpleadoRepository;

@Service
public class EmpleadoService {
    @Autowired
    private EmpleadoRepository repo;

    public List<Empleado> listar()          { return repo.findAllOrdenado(); }
    public Empleado guardar(Empleado e)      { return repo.save(e); }
    public Empleado obtener(Long id)         { return repo.findById(id).orElse(null); }
    public void eliminar(Long id)            { repo.deleteById(id); }
}
