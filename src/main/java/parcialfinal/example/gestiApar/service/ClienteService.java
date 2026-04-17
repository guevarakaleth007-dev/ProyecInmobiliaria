package parcialfinal.example.gestiApar.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parcialfinal.example.gestiApar.model.Cliente;
import parcialfinal.example.gestiApar.repository.ClienteRepository;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository repo;

    public List<Cliente> listar()          { return repo.findAllOrdenado(); }
    public Cliente guardar(Cliente c)       { return repo.save(c); }
    public Cliente obtener(Long id)         { return repo.findById(id).orElse(null); }
    public void eliminar(Long id)           { repo.deleteById(id); }
}
