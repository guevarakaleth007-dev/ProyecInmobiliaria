package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Mantenimiento;
import parcialfinal.example.gestiApar.service.MantenimientoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mantenimiento")
public class MantenimientoController {

    @Autowired
    private MantenimientoService service;

    @GetMapping
    public List<Mantenimiento> listar() {
        return service.listar();
    }

    @GetMapping("/apartamento/{idApartamento}")
    public List<Mantenimiento> listarPorApartamento(@PathVariable Long idApartamento) {
        return service.listarPorApartamento(idApartamento);
    }

    @GetMapping("/{id}")
    public Mantenimiento obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public Mantenimiento guardar(@RequestBody Mantenimiento m) {
        return service.guardar(m);
    }

    @PutMapping("/{id}")
    public Mantenimiento actualizar(@PathVariable Long id, @RequestBody Mantenimiento m) {
        m.setId(id);
        return service.guardar(m);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
