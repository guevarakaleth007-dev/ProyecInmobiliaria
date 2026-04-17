package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import parcialfinal.example.gestiApar.model.Propietario;
import java.util.List;

public interface PropietarioRepository extends JpaRepository<Propietario, Long> {
    @Query("SELECT p FROM Propietario p ORDER BY p.id")
    List<Propietario> findAllOrdenado();
}
