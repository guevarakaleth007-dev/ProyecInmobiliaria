package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parcialfinal.example.gestiApar.model.PagoContrato;

import java.util.List;

public interface PagoContratoRepository extends JpaRepository<PagoContrato, Long> {
    List<PagoContrato> findByIdContrato(Long idContrato);
}
