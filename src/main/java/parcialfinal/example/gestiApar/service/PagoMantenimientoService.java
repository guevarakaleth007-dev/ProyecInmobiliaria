package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.PagoMantenimiento;
import parcialfinal.example.gestiApar.repository.PagoMantenimientoRepository;

import java.util.List;

@Service
public class PagoMantenimientoService {

    @Autowired
    private PagoMantenimientoRepository repo;

    public List<PagoMantenimiento> listar() {
        return repo.findAll();
    }

    public List<PagoMantenimiento> listarPorMantenimiento(Long idMantenimiento) {
        return repo.findByIdMantenimiento(idMantenimiento);
    }

    public PagoMantenimiento guardar(PagoMantenimiento p) {
        return repo.save(p);
    }

    public PagoMantenimiento obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
