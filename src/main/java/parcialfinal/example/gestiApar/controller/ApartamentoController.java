package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Apartamento;
import parcialfinal.example.gestiApar.service.ApartamentoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/apartamento")
public class ApartamentoController {

    @Autowired
    private ApartamentoService service;

    @GetMapping
    public List<Apartamento> listar() {
        return service.listar();
    }

    @GetMapping("/estado/{estado}")
    public List<Apartamento> listarPorEstado(@PathVariable Boolean estado) {
        return service.listarPorEstado(estado);
    }

    @PostMapping
    public Apartamento guardar(@RequestBody Apartamento a) {
        return service.guardar(a);
    }

    @GetMapping("/{id}")
    public Apartamento obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Apartamento actualizar(@PathVariable Long id, @RequestBody Apartamento a) {
        a.setId(id);
        return service.guardar(a);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
