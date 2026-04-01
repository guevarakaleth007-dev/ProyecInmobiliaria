package parcialfinal.example.gestiApar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parcialfinal.example.gestiApar.model.tipoPersona;
import parcialfinal.example.gestiApar.service.tipoPersonaService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/tipopersona")
public class tipoPersonaController {

    @Autowired
    private tipoPersonaService service;

    @GetMapping
    public List<tipoPersona> listar() {
        return service.listar();
    }

    @PostMapping
    public tipoPersona guardar(@RequestBody tipoPersona t) {
        return service.guardar(t);
    }

    @GetMapping("/{id}")
    public tipoPersona obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public tipoPersona actualizar(@PathVariable Long id,
                                  @RequestBody tipoPersona t) {
        t.setId(id);
        return service.guardar(t);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}