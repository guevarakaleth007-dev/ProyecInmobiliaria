package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Mantenimiento;
import parcialfinal.example.gestiApar.repository.MantenimientoRepository;

import java.util.List;

@Service
public class MantenimientoService {

    @Autowired
    private MantenimientoRepository repo;

    public List<Mantenimiento> listar() {
        return repo.findAll();
    }

    public List<Mantenimiento> listarPorApartamento(Long idApartamento) {
        return repo.findByIdApartamento(idApartamento);
    }

    public Mantenimiento guardar(Mantenimiento m) {
        return repo.save(m);
    }

    public Mantenimiento obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
