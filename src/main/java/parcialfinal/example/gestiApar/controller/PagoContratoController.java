package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.PagoContrato;
import parcialfinal.example.gestiApar.service.PagoContratoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pagoContrato")
public class PagoContratoController {

    @Autowired
    private PagoContratoService service;

    @GetMapping
    public List<PagoContrato> listar() { return service.listar(); }

    @GetMapping("/contrato/{idContrato}")
    public List<PagoContrato> listarPorContrato(@PathVariable Long idContrato) {
        return service.listarPorContrato(idContrato);
    }

    @PostMapping
    public PagoContrato guardar(@RequestBody PagoContrato p) { return service.guardar(p); }

    @GetMapping("/{id}")
    public PagoContrato obtener(@PathVariable Long id) { return service.obtener(id); }

    @PutMapping("/{id}")
    public PagoContrato actualizar(@PathVariable Long id, @RequestBody PagoContrato p) {
        p.setId(id);
        return service.guardar(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) { service.eliminar(id); }
}
