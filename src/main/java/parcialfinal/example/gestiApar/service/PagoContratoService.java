package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.PagoContrato;
import parcialfinal.example.gestiApar.repository.PagoContratoRepository;

import java.util.List;

@Service
public class PagoContratoService {

    @Autowired
    private PagoContratoRepository repo;

    public List<PagoContrato> listar() { return repo.findAll(); }

    public List<PagoContrato> listarPorContrato(Long idContrato) { return repo.findByIdContrato(idContrato); }

    public PagoContrato guardar(PagoContrato p) { return repo.save(p); }

    public PagoContrato obtener(Long id) { return repo.findById(id).orElse(null); }

    public void eliminar(Long id) { repo.deleteById(id); }
}
