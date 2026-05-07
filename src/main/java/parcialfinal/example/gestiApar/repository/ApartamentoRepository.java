package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parcialfinal.example.gestiApar.model.Apartamento;

import java.util.List;

public interface ApartamentoRepository extends JpaRepository<Apartamento, Long> {
    List<Apartamento> findByIdPropietario(Long idPropietario);
    List<Apartamento> findByIdCiudad(Long idCiudad);
    List<Apartamento> findByEstado(Boolean estado);
}
