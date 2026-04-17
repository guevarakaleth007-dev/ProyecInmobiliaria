package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import parcialfinal.example.gestiApar.model.Empleado;
import java.util.List;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    @Query("SELECT e FROM Empleado e ORDER BY e.id")
    List<Empleado> findAllOrdenado();
}
