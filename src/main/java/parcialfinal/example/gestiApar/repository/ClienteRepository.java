package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import parcialfinal.example.gestiApar.model.Cliente;
import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    @Query("SELECT c FROM Cliente c ORDER BY c.id")
    List<Cliente> findAllOrdenado();
}
