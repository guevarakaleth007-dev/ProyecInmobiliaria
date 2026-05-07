package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.FormaPago;
import parcialfinal.example.gestiApar.service.FormaPagoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/formaPago")
public class FormaPagoController {

    @Autowired
    private FormaPagoService service;

    @GetMapping
    public List<FormaPago> listar() { return service.listar(); }

    @PostMapping
    public FormaPago guardar(@RequestBody FormaPago f) { return service.guardar(f); }

    @GetMapping("/{id}")
    public FormaPago obtener(@PathVariable Long id) { return service.obtener(id); }

    @PutMapping("/{id}")
    public FormaPago actualizar(@PathVariable Long id, @RequestBody FormaPago f) {
        f.setId(id);
        return service.guardar(f);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) { service.eliminar(id); }
}
