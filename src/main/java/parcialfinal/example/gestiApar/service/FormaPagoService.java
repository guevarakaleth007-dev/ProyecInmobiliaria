package parcialfinal.example.gestiApar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.FormaPago;
import parcialfinal.example.gestiApar.repository.FormaPagoRepository;

import java.util.List;

@Service
public class FormaPagoService {

    @Autowired
    private FormaPagoRepository repo;

    public List<FormaPago> listar() { return repo.findAll(); }

    public FormaPago guardar(FormaPago f) { return repo.save(f); }

    public FormaPago obtener(Long id) { return repo.findById(id).orElse(null); }

    public void eliminar(Long id) { repo.deleteById(id); }
}
