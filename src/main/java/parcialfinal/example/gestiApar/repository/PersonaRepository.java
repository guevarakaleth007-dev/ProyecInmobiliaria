package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import parcialfinal.example.gestiApar.model.Persona;

import java.util.List;

public interface PersonaRepository extends JpaRepository<Persona, Long> {

    // Traer todas sin FETCH FIRST (compatible Oracle 10g)
    @Query("SELECT p FROM Persona p ORDER BY p.id")
    List<Persona> findAllOrdenado();
}
