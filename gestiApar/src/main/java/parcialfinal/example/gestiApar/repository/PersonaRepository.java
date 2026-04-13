package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parcialfinal.example.gestiApar.model.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
