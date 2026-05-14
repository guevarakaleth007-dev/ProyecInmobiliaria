package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parcialfinal.example.gestiApar.model.Mantenimiento;

import java.util.List;

public interface MantenimientoRepository extends JpaRepository<Mantenimiento, Long> {
    List<Mantenimiento> findByIdApartamento(Long idApartamento);
}
