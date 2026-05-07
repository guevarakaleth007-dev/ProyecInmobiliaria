package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Contrato;
import parcialfinal.example.gestiApar.service.ContratoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/contrato")
public class ContratoController {

    @Autowired
    private ContratoService service;

    @GetMapping
    public List<Contrato> listar() {
        return service.listar();
    }

    @GetMapping("/apartamento/{idApartamento}")
    public List<Contrato> listarPorApartamento(@PathVariable Long idApartamento) {
        return service.listarPorApartamento(idApartamento);
    }

    @PostMapping
    public Contrato guardar(@RequestBody Contrato c) {
        return service.guardar(c);
    }

    @GetMapping("/{id}")
    public Contrato obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Contrato actualizar(@PathVariable Long id, @RequestBody Contrato c) {
        c.setId(id);
        return service.guardar(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
