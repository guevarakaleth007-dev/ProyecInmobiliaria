package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parcialfinal.example.gestiApar.model.PagoMantenimiento;

import java.util.List;

public interface PagoMantenimientoRepository extends JpaRepository<PagoMantenimiento, Long> {
    List<PagoMantenimiento> findByIdMantenimiento(Long idMantenimiento);
}
