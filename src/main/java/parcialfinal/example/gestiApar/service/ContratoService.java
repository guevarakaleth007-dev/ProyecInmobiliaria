package parcialfinal.example.gestiApar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parcialfinal.example.gestiApar.model.Contrato;
import parcialfinal.example.gestiApar.repository.ApartamentoRepository;
import parcialfinal.example.gestiApar.repository.ContratoRepository;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository repo;

    public List<Contrato> listar() {
        return repo.findAll();
    }

    public List<Contrato> listarPorApartamento(Long idApartamento) {
        return repo.findByIdApartamento(idApartamento);
    }

   @Autowired
private ApartamentoRepository apartamentoRepo;

public Contrato guardar(Contrato c) {
    Contrato saved = repo.save(c);
    // Marcar apartamento como ocupado
    apartamentoRepo.findById(c.getIdApartamento()).ifPresent(a -> {
        a.setEstado(true);
        apartamentoRepo.save(a);
    });
    return saved;
}

    public Contrato obtener(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
