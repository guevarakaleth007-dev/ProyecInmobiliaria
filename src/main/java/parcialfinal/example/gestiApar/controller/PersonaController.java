package parcialfinal.example.gestiApar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import parcialfinal.example.gestiApar.model.Persona;
import parcialfinal.example.gestiApar.service.PersonaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/persona")
public class PersonaController {

    @Autowired
    private PersonaService service;

    @GetMapping
    public List<Persona> listar() {
        return service.listar();
    }

    @PostMapping
    public Persona guardar(@RequestBody Persona p) {
        return service.guardar(p);
    }

    @GetMapping("/{id}")
    public Persona obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Persona actualizar(@PathVariable Long id, @RequestBody Persona p) {
        p.setId(id);
        return service.guardar(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
