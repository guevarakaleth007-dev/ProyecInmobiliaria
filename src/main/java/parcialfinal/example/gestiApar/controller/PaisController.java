package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Pais;
import parcialfinal.example.gestiApar.service.PaisService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pais")
public class PaisController {

    @Autowired
    private PaisService service;

    @GetMapping
    public List<Pais> listar() {
        return service.listar();
    }

    @PostMapping
    public Pais guardar(@RequestBody Pais p) {
        return service.guardar(p);
    }

    @GetMapping("/{id}")
    public Pais obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Pais actualizar(@PathVariable Long id, @RequestBody Pais p) {
        p.setId(id);
        return service.guardar(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
