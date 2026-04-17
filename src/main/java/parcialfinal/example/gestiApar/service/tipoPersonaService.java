package parcialfinal.example.gestiApar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parcialfinal.example.gestiApar.model.tipoPersona;
import parcialfinal.example.gestiApar.repository.tipoPersonaRepository;

@Service
public class tipoPersonaService {
@Autowired
private tipoPersonaRepository repo;
public List<tipoPersona> listar(){
    return repo.findAll();
}
public tipoPersona guardar(tipoPersona t){
    return repo.save(t);
}
public void eliminar(Long id){
        repo.deleteById(id);
    }
    public tipoPersona obtener (Long id){
        return repo.findById(id).orElse(null);
    }
}
